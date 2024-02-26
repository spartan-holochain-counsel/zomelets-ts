
#
# Building
#
tsconfig.json:
	npx tsc --init				\
		-t es2022 -m es2022		\
		--moduleResolution node		\
		--esModuleInterop		\
		--strictNullChecks		\
		--outDir lib			\
		-d --sourceMap

lib/index.js:		src/*.ts tsconfig.json Makefile
	rm -f lib/*.js
	npx tsc --project ./tsconfig.json
