<% with Widget %>
	<% if InternalLink %><a class="internal_link" href="$InternalLink.Link" <% if NewWindow %>target="_blank"<% end_if %>><% end_if %>

	<figure class="$Type<% if $ExtraClass %> $ExtraClass<% end_if %>">
		<img src="$Image.URL" alt="$Image.Title" />
		<% if Caption %><figcaption class="image_caption">$Caption</figcaption><% end_if %>
		<% if LinkDescription %><div class="link-description">$LinkDescription</div><% end_if %>
	</figure>

	<% if InternalLink %></a><% end_if %>
<% end_with %>