<figure class="$Type<% if $ExtraClass %> $ExtraClass<% end_if %>">
	<a class="external_link" href="$LinkURL" <% if NewWindow %>target="_blank"<% end_if %>><% if LinkText %>$LinkText<% else %>$LinkURL<% end_if %></a>
	<% if LinkDescription %><figcaption class="link_description">$LinkDescription</figcaption><% end_if %>
</figure>