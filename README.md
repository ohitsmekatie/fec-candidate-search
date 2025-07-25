# FEC search

## Getting started

### Node dependencies

Install `nvm`. [Instructions here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script), [troubleshooting here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#troubleshooting-on-macos)

`nvm use`
`npm install`

### Environment files

Create a `.env` file with the same keys as the `.env.example` file.

### swagger-mcp

This repo includes a MCP server configs for cursor and VSCode pre-configured with `swagger-mcp`.

You will need to clone [the `swagger-mcp` repository](https://github.com/Vizioz/Swagger-MCP) into the file path used in the [mcp file](.cursor/mcp.json) onto your local machine.

The hashed swagger file the MCP server uses is already in version control; you should only have to enable the server to get access to the tools it exposes.

### FEC API

To call the FEC api, you need an api key. One can be obtained [here](https://api.open.fec.gov/developers/)

Add the key to your `.env` file.
