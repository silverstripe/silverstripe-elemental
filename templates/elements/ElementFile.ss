<figure class="$Type<% if $ExtraClass %> $ExtraClass<% end_if %>">
	<% with File %>
		<a class="$Extension" href="$Link">$Title</a>
	<% end_with %>
	<% if FileDescription %><figcaption class="file_description">$FileDescription</figcaption><% end_if %>
</figure>