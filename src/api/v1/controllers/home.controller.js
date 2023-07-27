import { thisMonthCustomerList } from "../helpers/customer.helper.js"
import { thisMonthAmount, thisMonthOrderList, thisMonthPendingAmount } from "../helpers/order.helper.js"
import { badRequest, success } from "../helpers/response.helper.js"

export async function getHomeData(req,res) {
    try {
        const customerCount = await thisMonthCustomerList()
        const saleCount = await thisMonthOrderList()
        const revenueCount = await thisMonthAmount()
        const pendingAmount = await thisMonthPendingAmount()
        return success(res,"this month data",{ customerCount, saleCount, revenueCount ,pendingAmount})
    } catch (error) {
        return badRequest(res, error.message)
    }
}