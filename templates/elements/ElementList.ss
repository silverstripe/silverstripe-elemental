<% if $ListName %>
	<h3>$ListName</h3>
<% end_if %>

<% if $Widget.Elements %>
	<ul class="$ClassName <% if $ExtraClass %> $ExtraClass<% end_if %>">
		<% loop $Widget.Elements %>
			<li class="Nested_{$ClassName}_Element">
				$Me
			</li>
		<% end_loop %>
	</ul>
<% end_if %>
