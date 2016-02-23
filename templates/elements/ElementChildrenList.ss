
<% if $Title && not HideTitle %>
	<h3>$Title</h3>
<% end_if %>

<% if ChildrenList %>
	<% loop ChildrenList %>
		<% include ElementChildrenList_Child %>
	<% end_loop %>
<% else %>
	<% include ElementChildrenList_NoChildren %>
<% end_if %>
