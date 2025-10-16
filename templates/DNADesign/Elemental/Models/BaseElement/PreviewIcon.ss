<% if $IconClass %>
    <span class="$IconClass" aria-hidden="true"></span>
<% end_if %>

<% if $IsVersioned && $VersionState %>
    <span
        class="element-editor-header__version-state element-editor-header__version-state--{$VersionState}"
        title="$VersionStateTitle"
    />
<% end_if %>
