<% if $Title %>
	<% if not HideTitle %>
		<h3>$Title</h3>
	<% end_if %>
<% end_if %>

$ListDescription

<% if $WidgetControllers %>
	<ul class="$ClassName <% if $ExtraClass %> $ExtraClass<% end_if %>">
		<% loop $WidgetControllers %>
			<li class="nested_element nested_element__{$ClassName.LowerCase}">
				$WidgetHolder
			</li>
		<% end_loop %>
	</ul>
<% end_if %>
