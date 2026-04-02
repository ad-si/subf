.PHONY: help
help: makefile
	@tail -n +4 makefile | grep ".PHONY"


node_modules: package.json
	npm install
	@touch $@


.PHONY: build
build: node_modules
	npx tsc
	echo '#!/usr/bin/env node' | cat - dist/cli.js > dist/cli.tmp \
		&& mv dist/cli.tmp dist/cli.js


.PHONY: test
test: node_modules
	npx vitest run


.PHONY: format
format: node_modules
	npx dprint fmt


.PHONY: clean
clean:
	rm -rf dist node_modules
