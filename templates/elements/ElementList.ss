<% if $Title %>
	<% if not HideTitle %>
		<h3>$Title</h3>
	<% end_if %>
<% end_if %>

$ListDescription

<% if $ElementControllers %>
	<ul class="$ClassName <% if $ExtraClass %> $ExtraClass<% end_if %>">
		<% loop $ElementControllers %>
			<li class="nested_element nested_element__{$ClassName.LowerCase}">
				$ElementHolder
			</li>
		<% end_loop %>
	</ul>
<% end_if %>
