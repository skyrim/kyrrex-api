# Kyrrex API

This library provides convenient access to the Kyrrex REST API.

To learn more about the API check out the [official documentation](https://docs.kyrrex.com/).

## Installation

`npm i kyrrex-api`

## Usage

```js
import KyrrexApi from 'kyrrex-api'

const kyrrex = new KyrrexApi({
    publicKey: '<your-kyrrex-PUBLIC-key>',
    secretKey: '<your-kyrrex-SECRET-key>'
})

// example api call
const assets = await kyrrex.getAssets({
    page: 2,
    active_withdrawal: true
})
```
