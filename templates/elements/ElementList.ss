<% if $Title %>
	<% if not HideTitle %>
		<h3>$Title</h3>
	<% end_if %>
<% end_if %>

$ListDescription

<% if $Widget.Elements %>
	<ul class="$ClassName <% if $ExtraClass %> $ExtraClass<% end_if %>">
		<% loop $Widget.Elements %>
			<li class="nested_element nested_element__{$ClassName.LowerCase}">
				$Me
			</li>
		<% end_loop %>
	</ul>
<% end_if %>
