# Style Guide

## Revisions

| Version | Date | Author | Description |
| ------- | ---- | ------ | ----------- |
| 1.0.0 | 7/02/2015 | lvanden | First draft with basic structure |

## Development standards

### Id Generation

**How to create an ID**

1. Must be camelCase
2. Must be unique
3. Must be descriptive enough
4. Can't be generic

##### Examples
---

**Good**

```
 <div id="btnGoToDashboard"></div>
```
**Bad**

```
 <div id="btn-go-to-dashboard"></div>
 <div id="btn"></div>
```

**How to create a css class**

1. Must be dash separated
2. Must be descriptive enough

##### Examples
---

**Good**

```
 <div id="btn-success"></div>
```
**Bad**

```
 <div id="btnSuccess"></div>
```

### Collections Management

**Current library usage**

[Underscore](http://underscorejs.org/)


### Comparation and Logic Evaluations

#### Always use strict operators [reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Comparison_operators)

**Good**

```
if (privateContext.userProfile.defaultLocation === location.locationId) {
	// do something
}

this evaluate object type and value.

```
**Bad**

```
if (privateContext.userProfile.defaultLocation == location.locationId) {
	// do something
}
```

this evaluate only value.

#### Replace Nested Conditional with Guard Clauses [reference](http://sourcemaking.com/refactoring/replace-nested-conditional-with-guard-clauses)

**Good**

```
 var getPayAmount function() {
    if (_isDead) return deadAmount();
    if (_isSeparated) return separatedAmount();
    if (_isRetired) return retiredAmount();
    return normalPayAmount();
  };

```
**Bad**

```
  var getPayAmount function() {
    double result;
    if (_isDead) result = deadAmount();
    else {
        if (_isSeparated) result = separatedAmount();
        else {
            if (_isRetired) result = retiredAmount();
            else result = normalPayAmount();
        };
    }
  return result;
  };
```