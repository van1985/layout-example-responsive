# Scss Linter #

Scss linter is a tool used to check for errors in the .scss files. Whenever you try to make a new commit, the "scsslint" task will automatically run check all of the sass files. 

## Installation ##

To use the linter task. You need to install the scss-lint ruby gem

	gem install scss-lint

As well as installing the grunt-scss-lint node package. A simple npm install will suffice.

	npm install

## Usage ##

The task will run automatically on every commit. But if you feel like using it manually, you can use the "scsslint" grunt task.

	grunt scsslint

The task will generate a report file on the root of the application to guide you in the resolution of the problems you may have.

	scss-lint-report.xml

## List of linters ##

1. BangFormat
2. BorderZero
3. DebugStatement
4. DeclarationOrder
5. DuplicateProperty
6. ElsePlacement
7. EmptyLineBetweenBlocks
8. EmptyRule
9. FinalNewline
10. IdSelector
11. ImportPath
12. Indentation
13. LeadingZero (include_zero)
14. MergeableSelector
15. NameFormat
16. NestingDepth
17. PropertySpelling
18. PropertyUnits
19. SelectorDepth
20. SelectorFormat
21. Shorthand
22. SingleLinePerProperty
23. SingleLinePerSelector
24. SpaceAfterComma
25. SpaceAfterPropertyColon
26. SpaceAfterPropertyName
27. SpaceBeforeBrace
28. SpaceBetweenParens
29. StringQuotes
30. TrailingSemicolon
31. TrailingZero
32. UnnecessaryMantissa
33. UnnecessaryParentReference
34. UrlFormat
35. UrlQuotes
36. VariableForProperty
37. VendorPrefix
38. ZeroUnit

## Reference ##

### Scss-lint documentation: ###
[https://github.com/brigade/scss-lint](https://github.com/brigade/scss-lint)
### Grunt task documentation: ###
[https://github.com/brigade/scss-lint/blob/master/lib/scss_lint/linter/README.md](https://github.com/brigade/scss-lint/blob/master/lib/scss_lint/linter/README.md)
### Linter reference: ###
[https://github.com/ahmednuaman/grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint)