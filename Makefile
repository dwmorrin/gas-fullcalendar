buildDir := build
clientBundles := clientBundles
serverSrc := serverJs
clientSrc := clientJs

all: $(buildDir)/index.html $(buildDir)/server.js

$(buildDir)/server.js: $(wildcard $(serverSrc)/*) | $(buildDir)
	npx rollup $(serverSrc)/server.js -o $@

$(buildDir)/index.html: index.html $(clientBundles)/main.min.js | $(buildDir)
	inline --entry $< --output $@

$(clientBundles)/main.min.js: $(clientBundles)/main.js
	uglifyjs $< -o $@ -c -m

$(clientBundles)/main.js: $(wildcard src/*) | $(clientBundles)
	rollup -c

$(clientBundles):
	mkdir $@

$(buildDir):
	mkdir $@
	@echo "Created $@ for GAS project."
	@echo "To start a new project: clasp create --rootDir $@"
	@echo 'You should have a .clasp.json with "rootDir":"$@" in the root folder.'
	@echo 'You should have $@/appsscript.json file.'

push: $(wildcard $(buildDir)/*)
	clasp push
	touch push