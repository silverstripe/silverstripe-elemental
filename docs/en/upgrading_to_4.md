# Upgrading from Elemental 3 to 4

Version 4 of Elemental introduces some breaking changes which developers should be aware of.

These changes have been made in order to support Elemental transitioning from a PHP GridField based CMS interface into
a React JavaScript interface using the [SilverStripe GraphQL](https://github.com/silverstripe/silverstripe-graphql/) API
as the backend. The data model and relationships remain largely the same.

## Notable changes

### ElementalEditor and GridField

`ElementalEditor` no longer extends from `GridField`. In order to customise components of the elemental editor in
the CMS, developers must now use the JavaScript Injector and apply React higher order components to transform the
behaviour of individual components.

For more information, [see here](https://docs.silverstripe.org/en/4/developer_guides/customising_the_admin_interface/how_tos/customise_react_components/).

### ElementalArea and SiteTree

All `SiteTree` instances now have the elemental `SiteTreeExtension` extension applied (regardless of where you
apply `ElementalPageExtension`), in order to provide a consistent API surface for accessing the associated
`ElementalArea` (required for GraphQL queries). Developers using more ElementalArea relations than the default will
need to add similar extensions, as well as augment the GraphQL query at
`client/src/state/editor/readBlocksForPageQuery.js`.
