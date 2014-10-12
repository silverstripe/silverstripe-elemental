<ul class="$ClassName <% if $ExtraClass %> $ExtraClass<% end_if %>">
	<% if TwitterUser %><li class="twitter"><a href="https://twitter.com/$TwitterUser">@{$TwitterUser}</li><% end_if %>
	<% if FacebookLink %><li class="facebook"><a href="$FacebookLink">Facebook</a></li><% end_if %>
	<% if LinkedInLink %><li class="linkedin"><a href="$LinkedInLink">LinkedIn</a></li><% end_if %>
	<% if GooglePlusLink %><li class="google"><a href="$GooglePlusLink">Google Plus</a></li><% end_if %>
</ul>