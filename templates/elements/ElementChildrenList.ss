<% with Widget %>
	<% if $Label %>
		<h3>$Label</h3>
	<% end_if %>

	<% if ChildrenList %>
		<% loop ChildrenList %>
			<% include ElementChildrenList_Child %>
		<% end_loop %>
	<% else %>
		<% include ElementChildrenList_NoChildren %>
	<% end_if %>
<% end_with %>