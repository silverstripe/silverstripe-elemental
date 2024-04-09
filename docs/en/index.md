---
title: Silverstripe elemental
---

# Silverstripe elemental

## Introduction

This module extends a page type to swap the content area for a list of manageable elements to compose a page out
of rather than a single text field. Features supported:

- Versioning of elements
- Ability to add, remove supported elements per *elemental area*

The module provides basic markup for each of the elements but you will likely need to provide your own styles. Replace
the `$Content` variable with `$ElementalArea` in your page templates, and rely on the markup of the individual elements.

For a more detailed overview of using this module, please see [the User help guides](docs/en/userguide/index.md).

[CHILDREN includeFolders]
