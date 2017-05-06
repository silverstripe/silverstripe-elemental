
<% if InternalLink %>
	<a class="link--internal" href="$InternalLink.Link" <% if NewWindow %>target="_blank"<% end_if %>>
<% else_if LinkURL %>
	<a class="link--external" href="$LinkURL" <% if NewWindow %>target="_blank"<% end_if %>>
<% end_if %>

<figure class="$Type<% if $ExtraClass %> $ExtraClass<% end_if %>">
	<img src="$Image.URL" alt="$Image.Title" />
	<% if Caption %><figcaption class="image_caption">$Caption</figcaption><% end_if %>
	<% if LinkDescription %><div class="link-description">$LinkDescription</div><% end_if %>
</figure>

<% if InternalLink || LinkURL %></a><% end_if %>
