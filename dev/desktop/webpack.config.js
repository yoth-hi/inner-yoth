const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let data = {
    /*getElementByClass:"D",
  tag:"N",
  on:"T",
  taggleHide:"H",
  append:"la"*/
};
const fs = require("fs");

// Synchronous read

function f(x) {
    if (x >= 0 && x < 26) {
        return "" + String.fromCharCode("a".charCodeAt(0) + x);
    } else if (x >= 26 && x < 52) {
        return "" + String.fromCharCode("A".charCodeAt(0) + x - 26);
    } else {
        if (x < 0) return "";
        const int = Math.floor(x / 52);
        return "" + f(int) + f(x - int * 52);
    }
}
var jjj = 0;
const bd = "https://raw.githubusercontent.com/yoth-hi/yoth_temp_bd/main/";
class SortPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("ReplacePlugin", compilation => {
            const assetNames = Object.keys(compilation.assets);
            jjj = 0;
            var css = "";
            assetNames.forEach(filename => {
                let assetSource = compilation.assets[filename].source();
                assetSource = assetSource.replace(
                    /\_([a-z][\_\w]+)/g,
                    function (a, b) {
                        let mmm = f(jjj++);
                        if (mmm === "do" || mmm === "if") {
                            mmm = f(jjj++);
                        }
                        const t = data[b] || (data[b] = mmm);
                        if (
                            b == "_webpack_require__" ||
                            b == "__webpack_modules__" ||
                            b == "__proto__" ||
                            b == "_temp_bd" ||
                            b == "_esModule" ||
                            /yoth|_temp|_bd/.test(b) ||
                            /WEBPACK/.test(b) ||
                            /_ENDED/.test(b) ||
                            /_OPEN/.test(b) ||
                            /webpack/.test(b) ||
                            /node(_modules||a)/.test(filename)
                        )
                            return b.replace("", "");
                        console.log(`${b}\t\t\t=> ${data[b]}`);
                        return t;
                    }
                );
                compilation.assets[filename] = {
                    source: () => `${assetSource}`,
                    size: () => assetSource.length
                };
            });
        });
    }
}
const TextDecoder_ = TextDecoder ? new TextDecoder() : void 0;
const ii = {}
function stringToUnicodeEscape(str) {
    let unicodeEscape = "";
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i).toString(16).toUpperCase();
        unicodeEscape +=
            "\\u" + "0000".substring(0, 4 - charCode.length) + charCode;
    }
    return unicodeEscape;
}
const css = fs.readFileSync('./styles.css', 'utf8');
  
console.log(ii);
class compyleCss {
    apply(compiler) {
        compiler.hooks.emit.tap("cssCompiler", compilation => {
            const assetNames = Object.keys(compilation.assets);

            assetNames.forEach(filename => {
                const j = filename.split("/")[0];
                let y = ii[j] ?? ii["en"];
                let assetSource = compilation.assets[filename].source();
                if (
                  /\.css$/.test(filename)||
                  /\.text$/.test(filename)||
                  /\.html/.test(filename)
                ) {
                    assetSource = assetSource.replace(/\n|\ {2,}/g, "");
                } else {
                    assetSource = `(function(){
var a=document.createElement("style");
var b="${css.replaceAll("\"","'")}";
a.textContent=b;
document.head.appendChild(a);
})();` + assetSource
                    assetSource = assetSource.replace(/\n|\ {2,}/g, " ");
                  
                   }
                compilation.assets[filename] = {
                    source: () => assetSource,
                    size: () => assetSource.length
                };
            });
        });
    }
}
module.exports = env => {
    return {
        mode: "production", // 'development', // Switch to 'production' for minification and compression
        entry: "./app.js",
        output: {
            path: path.resolve("jsbin"),
            filename: "app.js"
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
               {
                    test: /.js$/,
                    use: "babel-loader"
                } ,
              
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                }
            ]
        },
        performance: {
            hints: false,
            maxEntrypointSize: 1512000,
            maxAssetSize: 1512000
        },
        plugins: [
            new compyleCss(),
            new SortPlugin(),
            // new HtmlWebpackPlugin({
            //     template: "./index.html",
            //     filename: "index.html" 
            // }),
            new MiniCssExtractPlugin({
              filename:"styles.css"
            })  
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            // Configuration options for compression
                            warnings: false,
                            drop_console: true
                            // Add more compression options as needed
                        }
                        /*  mangle: {
            // You can specify options for method name mangling here
            properties: {
              // mangle method names
              regex: /^_|^\$/  // Only mangle method names starting with underscore
            }
          }*/
                    }
                }) // This will minify JavaScript
            ]
        }
    };
};
