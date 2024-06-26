from http.server import HTTPServer
from backend.main import handler

def run(server_class=HTTPServer, handler_class=handler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"""Starting httpd on port {port}\n- run dev: http://localhost:{port}\n- run previw: 127.0.0.1:{port}\n""")
    httpd.serve_forever()

if __name__ == '__main__':
    run()