# OrcaSoundViz WebApp

Node.JS site for prototyping map app using mapbox

![GitHub](https://img.shields.io/github/license/JiayiIsaPopulerName/orcamap?color=%2381D4FA&style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/JiayiIsaPopulerName/orcamap?color=%2381C784&style=flat-square)
![Website](https://img.shields.io/website?color=%23FFEE58&style=flat-square&url=http%3A%2F%2Fwww.orcasound.net%2F)
![GitHub language count](https://img.shields.io/github/languages/count/JiayiIsaPopulerName/orcamap?color=%23FF8A65&style=flat-square)


## Features
- Current Orcasound hydrophone locations and orca observation locations can be seen on the map. 
- Stores detail information of each observation of orcas which can be seen from Google sheets.
- A ReactJS version of Orcamap [orcamap-react](https://github.com/orcasound/orcamap-react)

## Directories
 
```
├── data
│   └── ingest
├── docs
├── node_modules
│   ├── abbrev
│   ├── accepts
│   ├── ansi-align
│   ├── ansi-regex
│   ├── ansi-styles
│   ├── anymatch
│   ├── array-flatten
│   ├── balanced-match
│   ├── binary-extensions
│   ├── body-parser
│   │   └── lib
│   │       └── types
│   ├── boxen
│   ├── brace-expansion
│   ├── braces
│   │   └── lib
│   ├── bytes
│   ├── camelcase
│   ├── capture-stack-trace
│   ├── chalk
│   │   └── types
│   ├── chokidar
│   │   ├── lib
│   │   └── types
│   ├── ci-info
│   ├── cli-boxes
│   ├── color-convert
│   ├── color-name
│   ├── concat-map
│   │   ├── example
│   │   └── test
│   ├── configstore
│   ├── content-disposition
│   │   └── node_modules
│   │       └── safe-buffer
│   ├── content-type
│   ├── cookie
│   ├── cookie-signature
│   ├── create-error-class
│   ├── cross-spawn
│   │   └── lib
│   │       └── util
│   ├── crypto-random-string
│   ├── debug
│   │   ├── node_modules
│   │   │   └── ms
│   │   └── src
│   ├── deep-extend
│   │   └── lib
│   ├── depd
│   │   └── lib
│   │       ├── browser
│   │       └── compat
│   ├── destroy
│   ├── dot-prop
│   ├── duplexer3
│   ├── ee-first
│   ├── encodeurl
│   ├── escape-html
│   ├── escape-string-regexp
│   ├── etag
│   ├── execa
│   │   └── lib
│   ├── express
│   │   ├── lib
│   │   │   ├── middleware
│   │   │   └── router
│   │   └── node_modules
│   │       └── safe-buffer
│   ├── fill-range
│   ├── finalhandler
│   ├── forwarded
│   ├── fresh
│   ├── fsevents
│   ├── get-stream
│   ├── glob-parent
│   ├── global-dirs
│   ├── got
│   ├── graceful-fs
│   ├── has-flag
│   ├── http-errors
│   ├── iconv-lite
│   │   ├── encodings
│   │   │   └── tables
│   │   └── lib
│   ├── ignore-by-default
│   ├── import-lazy
│   ├── imurmurhash
│   ├── inherits
│   ├── ini
│   ├── ipaddr.js
│   │   └── lib
│   ├── is-binary-path
│   ├── is-ci
│   ├── is-extglob
│   ├── is-fullwidth-code-point
│   ├── is-glob
│   ├── is-installed-globally
│   ├── is-npm
│   ├── is-number
│   ├── is-obj
│   ├── is-path-inside
│   ├── is-redirect
│   ├── is-retry-allowed
│   ├── is-stream
│   ├── isexe
│   │   └── test
│   ├── latest-version
│   ├── lowercase-keys
│   ├── lru-cache
│   ├── make-dir
│   ├── media-typer
│   ├── merge-descriptors
│   ├── methods
│   ├── mime
│   │   └── src
│   ├── mime-db
│   ├── mime-types
│   ├── minimatch
│   ├── minimist
│   │   ├── example
│   │   └── test
│   ├── negotiator
│   │   └── lib
│   ├── nodemon
│   │   ├── bin
│   │   ├── doc
│   │   │   └── cli
│   │   ├── lib
│   │   │   ├── cli
│   │   │   ├── config
│   │   │   ├── help
│   │   │   ├── monitor
│   │   │   ├── rules
│   │   │   └── utils
│   │   └── node_modules
│   │       ├── debug
│   │       │   ├── dist
│   │       │   └── src
│   │       └── ms
│   ├── nopt
│   │   ├── bin
│   │   ├── examples
│   │   └── lib
│   ├── normalize-path
│   ├── npm-run-path
│   ├── on-finished
│   ├── p-finally
│   ├── package-json
│   ├── parseurl
│   ├── path-is-inside
│   │   └── lib
│   ├── path-key
│   ├── path-to-regexp
│   ├── picomatch
│   │   └── lib
│   ├── pify
│   ├── prepend-http
│   ├── proxy-addr
│   ├── pseudomap
│   │   └── test
│   ├── pstree.remy
│   │   ├── lib
│   │   └── tests
│   │       └── fixtures
│   ├── qs
│   │   ├── dist
│   │   ├── lib
│   │   └── test
│   ├── range-parser
│   ├── raw-body
│   ├── rc
│   │   ├── lib
│   │   └── test
│   ├── readdirp
│   ├── registry-auth-token
│   │   └── test
│   ├── registry-url
│   ├── safe-buffer
│   ├── safer-buffer
│   ├── semver
│   │   └── bin
│   ├── semver-diff
│   ├── send
│   │   └── node_modules
│   │       └── ms
│   ├── serve-static
│   ├── setprototypeof
│   │   └── test
│   ├── shebang-command
│   ├── shebang-regex
│   ├── signal-exit
│   ├── statuses
│   ├── string-width
│   ├── strip-ansi
│   ├── strip-eof
│   ├── strip-json-comments
│   ├── supports-color
│   ├── term-size
│   │   └── vendor
│   │       ├── macos
│   │       └── windows
│   ├── timed-out
│   ├── to-regex-range
│   ├── toidentifier
│   ├── touch
│   │   └── bin
│   ├── type-is
│   ├── undefsafe
│   │   └── lib
│   ├── unique-string
│   ├── unpipe
│   ├── unzip-response
│   ├── update-notifier
│   ├── url-parse-lax
│   ├── utils-merge
│   ├── vary
│   ├── which
│   │   └── bin
│   ├── widest-line
│   ├── write-file-atomic
│   ├── xdg-basedir
│   └── yallist
├── notebooks
├── setup
├── src
└── www
    ├── css
    ├── data
    ├── js
    └── static
```
## Setup

1. Clone the repo.

## Prerequistes

- Install [NodeJS](https://nodejs.org/en/download/package-manager/) on your development machine.(or use [package manager](https://nodejs.org/en/download/package-manager/))
 
- Request access to Google Spreadsheets data source

## Run
1. Get into your orcamap directory.
2. Execute `npm install`.
3. Execute `npm start`.
4. Open `https://localhost:3000/`

## Test

- TODO
## Contributing
1. Fork this repo.
2. Create a branch: git checkout -b <branch_name>.
3. Make your changes and commit them: git commit -m'<commit_message>'
4. Push to the original branch: git push -u origin <feature_branch_name>
5. Make a pull request.

## License

GNU Affero General Public License v3.0


