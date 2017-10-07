
build:
	@node index.js

lint:
	@./node_modules/.bin/eslint --ext .js --cache src
