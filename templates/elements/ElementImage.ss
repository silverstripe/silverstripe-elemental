<% with Widget %>
	<figure class="$Type<% if $ExtraClass %> $ExtraClass<% end_if %>">
		<img src="$Image.URL" alt="$Image.Title" />
		<% if Caption %><figcaption class="image_caption">$Caption</figcaption><% end_if %>
		<% if LinkDescription %><div class="link-description">$LinkDescription</div><% end_if %>
	</figure>
<% end_with %>