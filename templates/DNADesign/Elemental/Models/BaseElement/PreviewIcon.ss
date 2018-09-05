<% if $IconClass %>
    <i class="$IconClass"></i>
<% end_if %>

<% if $IsVersioned && $VersionState %>
    <span class="element-editor__element--{$VersionState}">
        <span class="element-editor-header__version-state" title="$VersionStateTitle"></span>
    </span>
<% end_if %>
