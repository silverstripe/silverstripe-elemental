<ul class="$type<% if $ExtraClass %> $ExtraClass<% end_if %>">
	<% if ContactName %><li class="name">$ContactName</li><% end_if %>
	<% if Address %><li class="address">$Address
		<% if Address2 %><br/>$Address2<% end_if %>
		<% if Suburb %><br/>$Suburb<% if $Postcode %> $Postcode<% end_if %><% end_if %>
	</li><% end_if %>
	<% if Phone %><li class="phone">$Phone</li><% end_if %>
	<% if Fax %><li class="fax">$Fax</li><% end_if %>
	<% if Email %><li class="email"><a href="mailto:$ObfuscatedEmail">$ObfuscatedEmail</a></li><% end_if %>
	<% if Website %><li class="website"><a href="$Website">$Website</a></li><% end_if %>
</ul>