<figure class="$Type<% if $ExtraClass %> $ExtraClass<% end_if %>">
	<a class="<% if InternalLink %>internal_link<% else %>external_link<% end_if %>" href="<% if InternalLink %>$InternalLink.Link<% else %>$LinkURL<% end_if %>" <% if NewWindow %>target="_blank"<% end_if %>><% if LinkText %>$LinkText<% else %>$LinkURL<% end_if %></a>
	<% if LinkDescription %><figcaption class="link_description">$LinkDescription</figcaption><% end_if %>
</figure>