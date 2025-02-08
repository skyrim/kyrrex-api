import { kyrrexApiRequest } from './request.js'

export class KyrrexApi {
  constructor(params) {
    this.publicKey = params.publicKey
    this.secretKey = params.secretKey
  }

  request(method, endpoint, data) {
    return kyrrexApiRequest(method, endpoint, data, {
      publicKey: this.publicKey,
      secretKey: this.secretKey,
    })
  }

  /**
   * Retrieves information about the current authenticated member.
   *
   * [Official Documentation](https://docs.kyrrex.com/members-data/get-api-v2-members-me)
   *
   * @returns {Promise<any>}
   */
  getMembersMe() {
    return this.request('GET', '/api/v2/members/me')
  }

  /**
   * Retrieves total balances for the authenticated member.
   *
   * [Official Documentation](https://docs.kyrrex.com/members-data/get-api-v2-members-total_balance)
   *
   * @param {Object} params
   * @param {string} params.output_asset Asset against which all balances will be calculated
   * @returns {Promise<any>}
   */
  getMembersTotalBalance(params) {
    return this.request('GET', '/api/v2/members/total_balance', params)
  }

  /**
   * Retrieves a list of accounts for the authenticated member.
   *
   * [Official Documentation](https://docs.kyrrex.com/members-data/get-api-v2-members-accounts)
   *
   * @param {Object} params
   * @param {boolean=} params.only_positive_accounts Filter accounts with nonzero balance
   * @param {string[]=} params.tags Filter accounts by tags
   * @returns {Promise<any>}
   */
  getMembersAccounts(params) {
    return this.request('GET', '/api/v2/members/accounts', params)
  }

  /**
   * Retrieves a list of assets with optional filters.
   *
   * [Official Documentation](https://docs.kyrrex.com/assets/get-api-v2-assets)
   *
   * @param {Object} params
   * @param {number=} params.page Page number
   * @param {number=} params.per_page Number of assets per page
   * @param {boolean=} params.active_deposit Filter assets with active deposits
   * @param {boolean=} params.active_withdrawal Filter assets with active withdrawals
   * @returns {Promise<any>}
   */
  getAssets(params) {
    return this.request('GET', '/api/v2/assets', params)
  }

  /**
   * Retrieves information about a specific asset.
   *
   * [Official Documentation](https://docs.kyrrex.com/assets/get-api-v2-assets-code)
   *
   * @param {Object} params
   * @param {string} params.code Asset identifier
   * @returns {Promise<any>}
   */
  getAsset(params = {}) {
    return this.request('GET', `/api/v2/assets/${params.code}`)
  }

  /**
   * Retrieves a list of markets.
   *
   * [Official Documentation](https://docs.kyrrex.com/market/get-api-v2-markets)
   *
   * @param {Object} params
   * @param {number=} params.page Pagination page number
   * @param {number=} params.per_page Number of items per page
   * @param {boolean=} params.active Filter only active markets
   * @param {string=} param.asset Mutually exclusive with base_asset and quote_asset. Filters markets including the specified asset as either base or quote currency
   * @param {string=} param.base_asset Filters markets including the specified asset as the base currency
   * @param {string=} param.quote_asset Filters markets including the specified asset as the quote currency
   * @param {string=} param.type Filters markets by asset type (crypto, fiat)
   * @param {string[]=} param.tags Filters markets by tags
   * @returns {Promise<any>}
   */
  getMarkets(params) {
    return this.request('GET', '/api/v2/markets', params)
  }

  /**
   * Retrieves information about a specific market.
   *
   * [Official Documentation](https://docs.kyrrex.com/market/get-api-v2-markets-info)
   *
   * @param {Object} params
   * @param {string} params.market Market identifier
   * @returns {Promise<any>}
   */
  getMarketInfo(params) {
    return this.request('GET', '/api/v2/markets/info', params)
  }

  /**
   * Retrieves a list of deposit addresses.
   *
   * [Official Documentation](https://docs.kyrrex.com/deposit-addresses/get-api-v2-deposit_addresses)
   *
   * @param {Object} params
   * @param {number=} params.page Pagination page number
   * @param {number=} params.per_page Number of items per page
   * @param {string[]=} params.dchains Filters addresses by blockchain identifiers
   * @param {string=} params.gateway Filters addresses by gateway
   * @returns {Promise<any>}
   */
  getDepositAddresses(params) {
    return this.request('GET', '/api/v2/deposit_addresses', params)
  }

  /**
   * Creates a new deposit address.
   *
   * [Official Documentation](https://docs.kyrrex.com/deposit-addresses/post-api-v2-deposit_addresses)
   *
   * @param {Object} params
   * @param {string} params.dchain Blockchain identifier
   * @returns {Promise<any>}
   */
  createDepositAddress(params) {
    return this.request('POST', '/api/v2/deposit_addresses', params)
  }

  /**
   * Retrieves a list of deposit transactions.
   *
   * [Official Documentation](https://docs.kyrrex.com/transaction/get-api-v2-transactions-deposits-list)
   *
   * @param {Object} params
   * @param {number=} params.page Pagination page number
   * @param {number=} params.per_page Number of items per page
   * @param {string=} params.asset Filters transactions by asset
   * @param {string=} params.status Filters transactions by status
   * @param {Date=} params.from Filters transactions from this date
   * @param {Date=} params.to Filters transactions until this date
   * @param {('asc'|'desc')=} params.sort Sort order (asc or desc)
   * @param {string=} params.sort_by Sort by specific field
   * @returns {Promise<any>}
   */
  getTransactions(params) {
    return this.request('GET', '/api/v2/transactions', params)
  }

  /**
   * Retrieves a list of withdrawal transactions.
   *
   * [Official Documentation](https://docs.kyrrex.com/transaction/get-api-v2-transactions-withdrawals-withdrawals-list)
   *
   * @param {Object} params
   * @param {number=} params.page Pagination page number
   * @param {number=} params.per_page Number of items per page
   * @param {string=} params.asset Filters transactions by asset
   * @param {string=} params.status Filters transactions by status
   * @param {Date=} params.from Filters transactions from this date
   * @param {Date=} params.to Filters transactions until this date
   * @param {('asc'|'desc')=} params.sort Sort order (asc or desc)
   * @param {string=} params.sort_by Sort by specific field
   * @returns {Promise<any>}
   */
  getWithdrawalTransactions(params) {
    return this.request('GET', '/api/v2/transactions/withdrawals', params)
  }

  /**
   * Retrieves a list of requisites based on various filters.
   *
   * [Official Documentation](https://docs.kyrrex.com/requisites/get-api-v2-requisites)
   *
   * @param {Object} params
   * @param {number=} params.page Pagination page number
   * @param {number=} params.per_page Number of items per page
   * @param {string=} params.search Search by partial match on address, tag, description, or name
   * @param {string=} params.state Filter by status
   * @param {string=} params.asset Filter by asset (mutually exclusive with dchain)
   * @param {string=} params.dchain Filter by dchain (mutually exclusive with asset)
   * @param {string=} params.name Search by name
   * @param {string=} params.address Search by address
   * @param {('asc'|'desc')=} params.sort Sort order (asc or desc)
   * @param {string=} params.sort_by Sort by specific field
   * @returns
   */
  getRequisites(params) {
    return this.request('GET', '/api/v2/requisites', params)
  }

  /**
   * Lists requisites with optional filters.
   *
   * [Official Documentation](https://docs.kyrrex.com/requisites/get-api-v2-fiat-requisites)
   *
   * @param {Object} params
   * @param {number=} params.page Pagination page number
   * @param {number=} params.per_page Number of items per page
   * @param {string[]=} params.dchains Filter by dchains
   * @param {string=} params.gateway
   * @returns {Promise<any>}
   */
  getFiatRequisites(params) {
    return this.request('GET', '/api/v2/fiat/requisites', params)
  }

  /**
   * Creates a new withdrawal.
   *
   * [Official Documentation](https://docs.kyrrex.com/withdrawals/post-api-v2-withdrawals)
   *
   * @param {Object} params
   * @param {string} params.dchain Blockchain identifier
   * @param {number} params.amount Withdrawal amount
   * @param {string=} params.destination Address to which the withdrawal will be sent (mutually exclusive with requisite_id)
   * @param {string=} destination_tag Tag of the destination address
   * @param {string=} params.requisite_id Identifier of the requisite (mutually exclusive with destination)
   * @returns {Promise<any>}
   */
  createWithdrawal(params) {
    return this.request('POST', '/api/v2/withdrawals', params)
  }

  /**
   * Lists exchanges with optional filters.
   *
   * [Official Documentation](https://docs.kyrrex.com/exchange/get-api-v2-exchanges)
   *
   * @param {Object} params
   * @param {number=} params.page Pagination page number
   * @param {number=} params.per_page Number of items per page
   * @param {string=} params.input_asset Identifier of the input asset
   * @param {string=} params.output_asset Identifier of the output asset
   * @param {string=} params.state Filter by status
   * @param {Date=} params.from Filter by start date
   * @param {Date=} params.to Filter by end date
   * @param {('asc'|'desc')=} params.sort Sort order (asc or desc)
   * @param {string=} params.sort_by Sort by specific field
   * @returns {Promise<any>}
   */
  getExchanges(params) {
    return this.request('GET', '/api/v2/exchanges', params)
  }

  /**
   * Creates a new exchange.
   *
   * [Official Documentation](https://docs.kyrrex.com/exchange/post-api-v2-exchanges)
   *
   * @param {Object} params
   * @param {string} params.input_asset Identifier of the input asset
   * @param {string} params.output_asset Identifier of the output asset
   * @param {number} params.amount Amount to be exchanged
   * @returns {Promise<any>}
   */
  createExchange(params) {
    return this.request('POST', '/api/v2/exchanges', params)
  }

  /**
   * Estimates an exchange rate for given assets and amount.
   *
   * [Official Documentation](https://docs.kyrrex.com/exchange/get-api-v2-exchanges-estimate)
   *
   * @param {Object} params
   * @param {string} params.input_asset Identifier of the input asset
   * @param {string} params.output_asset Identifier of the output asset
   * @param {number} params.amount Amount to be exchanged
   * @returns {Promise<any>}
   */
  getExchangeEstimate(params) {
    return this.request('GET', '/api/v2/exchanges/estimate', params)
  }

  /**
   * Lists orders with optional filters.
   *
   * [Official Documentation](https://docs.kyrrex.com/order/get-api-v2-orders)
   *
   * @param {Object} params
   * @param {string=} params.market Filter by market identifier
   * @param {Date=} params.from Filter by start date
   * @param {Date=} params.to Filter by end date
   * @param {string=} params.asset Filter by asset identifier
   * @param {string=} params.state Filter by status
   * @param {string=} params.side Filter by direction
   * @param {string=} params.ord_type Filter by order type
   * @param {number=} params.price_min Filter by minimum price
   * @param {number=} params.price_max Filter by maximum price
   * @param {('asc'|'desc')=} params.sort Sort order (asc or desc)
   * @param {string=} params.sort_by Sort by specific field
   * @param {number=} params.page Pagination page number
   * @param {number=} params.per_page Number of items per page
   * @returns {Promise<any>}
   */
  getOrders(params) {
    return this.request('GET', '/api/v2/orders', params)
  }

  /**
   * Retrieves order information by ID.
   *
   * [Official Documentation](https://docs.kyrrex.com/order/get-api-v2-orders-id)
   *
   * @param {Object} params
   * @param {string} params.id Order identifier
   * @returns {Promise<any>}
   */
  getOrderByID(params) {
    return this.request('GET', `/api/v2/orders/${params.id}`)
  }

  /**
   * Creates a new order.
   *
   * [Official Documentation](https://docs.kyrrex.com/order/post-api-v2-orders)
   *
   * @param {Object} params
   * @param {string} params.market Market identifier
   * @param {string} params.side Order direction (buy or sell)
   * @param {string} params.ord_type Order type (limit or market)
   * @param {number=} params.volume Order volume
   * @param {number=} params.price Order price (required for limit order type)
   * @returns {Promise<any>}
   */
  createOrder(params) {
    return this.request('POST', '/api/v2/orders', params)
  }

  /**
   * Cancels an order by ID.
   *
   * [Official Documentation](https://docs.kyrrex.com/order/delete-api-v2-orders-id)
   *
   * @param {Object} params
   * @param {string} params.id Order identifier
   * @returns {Promise<any>}
   */
  cancelOrder(params) {
    return this.request('DELETE', `/api/v2/orders/${params.id}`)
  }

  /**
   * Cancels all orders.
   *
   * [Official Documentation](https://docs.kyrrex.com/order/delete-api-v2-orders)
   *
   * @returns {Promise<{ status: boolean }>}
   */
  cancelAllOrders() {
    return this.request('DELETE', '/api/v2/orders')
  }

  /**
   * Lists trades with optional filters.
   *
   * [Official Documentation](https://docs.kyrrex.com/trades/get-api-v2-trades)
   *
   * @param {Object} params
   * @param {string} params.market Filter by market identifier
   * @param {string=} params.side Filter by trade direction
   * @param {string=} params.asset Filter by asset identifier
   * @param {Date=} params.from Filter by start date
   * @param {Date=} params.to Filter by end date
   * @param {number=} params.page Pagination page number
   * @param {number=} params.per_page Number of items per page
   * @param {('asc'|'desc')=} params.sort Sort order (asc or desc)
   * @param {string=} params.sort_by Sort by specific field
   * @returns {Promise<any>}
   */
  getTrades(params) {
    return this.request('GET', '/api/v2/trades', params)
  }

  /**
   * Lists available markets with their configurations.
   *
   * [Official Documentation](https://docs.kyrrex.com/settings/get-api-v2-settings-markets)
   *
   * @returns {Promise<any>}
   */
  getAvailableMarkets() {
    return this.request('GET', '/api/v2/settings/markets')
  }

  /**
   * Lists available currencies with their configurations.
   *
   * [Official Documentation](https://docs.kyrrex.com/settings/get-api-v2-settings-currencies)
   *
   * @returns {Promise<any>}
   */
  getAvailableCurrencies() {
    return this.request('GET', '/api/v2/settings/currencies')
  }

  /**
   * Retrieves information about the API.
   *
   * [Official Documentation](https://docs.kyrrex.com/tools/get-api-v2-tools-info)
   *
   * @returns {Promise<any>}
   */
  getApiInfo() {
    return this.request('GET', '/api/v2/tools/info')
  }

  /**
   * Retrieves the current timestamp.
   *
   * [Official Documentation](https://docs.kyrrex.com/tools/get-api-v2-tools-timestamp)
   *
   * @returns {Promise<any>}
   */
  getCurrentTimestamp() {
    return this.request('GET', '/api/v2/tools/timestamp')
  }

  /**
   * Retrieves information about available services.
   *
   * [Official Documentation](https://docs.kyrrex.com/tools/get-api-v2-tools-services)
   *
   * @returns {Promise<any>}
   */
  getAvailableServices() {
    return this.request('GET', '/api/v2/tools/services')
  }
}

export default KyrrexApi
