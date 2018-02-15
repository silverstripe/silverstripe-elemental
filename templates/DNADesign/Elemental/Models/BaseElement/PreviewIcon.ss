<% if $IconClass %>
    <i class="$IconClass"></i>
<% end_if %>

<% if $IsVersioned && $VersionState %>
    <span class="element-item--{$VersionState}" title="$VersionStateTitle"></span>
<% end_if %>
