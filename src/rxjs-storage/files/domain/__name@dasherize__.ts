export interface <%= classify(name) %> {
  id: string | number;
  name: string;
<% if (props && props.length) {
  for (const prop of props) { %>
  <%= camelize(prop[0]) %>: <%= (prop[1] || 'any') %>;
<% }
} %>
}
