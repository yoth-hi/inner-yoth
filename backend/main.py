from http.server import BaseHTTPRequestHandler, HTTPServer
from os.path import join, exists, isfile
from urllib.parse import urlparse, unquote
from jinja2 import Template, Environment, FileSystemLoader
import os
import re
import brotli
import random
import logging
logger = logging.getLogger(__name__)
from .controller import renderContextPage, isPageHtml, isPageApi, RenderApi

# Configuração global
compression_quality = random.randint(0, 4) # Usar um nível de compressão fixo para consistência
current_directory = os.getcwd()
template_env = Environment(loader=FileSystemLoader(join(current_directory, 'frontend', 'desktop')))
cached_templates = {}

# Pré-carregar arquivos estáticos comuns na memória
static_files_cache = {}
def cache_static_files(path=None):
    static_paths = []
    if(path):
      static_paths = [path]
    else:
      static_paths = ['player/jsbin/en/main.js', 'main.js', 'styles.css']
    for path in static_paths:
        file_path = join(current_directory, 'frontend', path)
        if exists(file_path) and isfile(file_path):
            with open(file_path, 'rb') as f:
                static_files_cache[path] = brotli.compress(f.read(), quality=compression_quality)

cache_static_files()

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = unquote(parsed_path.path)
        if isPageHtml(path):
            self.serve_html(parsed_path, path)
        elif isPageApi(path):
            RenderApi(path, self, parsed_path)
        else:
        #    self.send_header('Age', '305232')
            self.serve_static(path)
    def do_POST(self):
        parsed_path = urlparse(self.path)
        path = unquote(parsed_path.path)
        if isPageApi(path,"POST"):
            RenderApi(path, self, parsed_path)
    def do_HEAD(self):
        self.send_response(204)
        self.send_header('Cross-Origin-Resource-Policy', 'cross-origin')
        logger.info(f"HEAD: {self.headers.get('Host')} {self.path}")
        self.end_headers()

    def serve_html(self, parsed_path, path):
        host = self.headers.get('Host')
        # Verifica o user-agent para determinar se é mobile
        user_agent = self.headers.get('User-Agent')
        is_mobile = re.search(r'Mobi|Android', user_agent, re.IGNORECASE)
        isProd = not (host == "127.0.0.1:8080" or host == "localhost:8080")
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Content-Encoding', 'br')
        self.send_header('Pragma', 'no-cache')
        self.send_header('compressed', f"{compression_quality}")
        self.send_header('Permissions-Policy', 'ch-ua-arch=*, ch-ua-bitness=*, ch-ua-full-version=*, ch-ua-full-version-list=*, ch-ua-model=*, ch-ua-wow64=*, ch-ua-form-factors=*, ch-ua-platform=*, ch-ua-platform-version=*')
        context = renderContextPage(parsed_path, self, is_mobile )
        self.end_headers()
        template_name = 'template.html'
        if True:#template_name not in cached_templates:
            with open(join(current_directory, 'backend', template_name), 'r', encoding='utf-8') as f:
                template_content = f.read()
                template_content = template_content.replace("\n","")
                cached_templates[template_name] = template_env.from_string(template_content)

        render = cached_templates[template_name].render(context)
        compressed_content = brotli.compress(render.encode('utf-8'), quality=compression_quality)
        self.wfile.write(compressed_content)

    def serve_static(self, path):
        # Remover a barra inicial
        path = path.lstrip('/s/')
        if path in static_files_cache:
            self.send_response(200)
            self.send_header('Content-type', self.get_content_type(path))
            self.send_header('Content-Encoding', 'br')
            self.end_headers()
            self.wfile.write(static_files_cache[path])
        else:
            in_ = "frontend";
            f = path[:7]
            if(self.headers.get('Host') == "localhost:8080"):
              prf = path[:6]
              if(path == "desktop/jsbin/dev.js"):
                in_ = "dev";
                path = "desk/app.js"
              elif(
                f == "desktop"
                ):
                path = "desktop/"+ path[14:]
                #path = "desk/"+ path[14:]
                in_ = "dev"
              elif(prf == "mobile" ):
                path = "mobile/"+ path[13:]
                in_ = "dev";
            file_path = join(current_directory, in_, path)
            if exists(file_path) and isfile(file_path):
                self.send_response(200)
                self.send_header('Content-type', self.get_content_type(path))
                self.send_header('Content-Encoding', 'br')
                self.end_headers()
                chunk_size = 1024*1024  # Tamanho do bloco em bytes
                with open(file_path, 'rb') as f:
                    while True:
                        chunk = f.read(chunk_size)
                        if not chunk:
                            break
                        compressed_chunk = brotli.compress(chunk, quality=compression_quality)
                        self.wfile.write(compressed_chunk)
            else:
                self.send_error(404, "File not found")

    def get_content_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.html'):
            return 'text/html; charset=utf-8'
        else:
            return 'text/plain'
logger.info('CREATE')
if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, handler)
    print('Running server on port 8000...')
    httpd.serve_forever()