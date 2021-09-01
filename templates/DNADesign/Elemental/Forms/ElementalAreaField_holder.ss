<div>
    <% if $Message %><p class="alert $AlertType" role="alert" id="message-$ID">$Message</p><% end_if %>
    <div $AttributesHTML data-schema="$SchemaData.JSON">
        <%-- Field is rendered by React components --%>
    </div>
</div>

