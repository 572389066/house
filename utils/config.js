//-----------------------协议 START--------------------//
const PROTOCOL_TYPE_PRIVACY = 'PrivacyPolicy' //隐私协议
//-----------------------协议 END--------------------//

//------------------------发送短信 START-------------------------//
const SMS_TYPE_LOGIN = 'SignIn'
const SMS_TYPE_REGISTER='SignUp'
const SMS_TYPE_BIND_BANK = 'BindBank'
const SMS_TYPE_UNBIND_BANK = 'UnBindBank'
const SMS_TYPE_WITHDRAW = 'Withdrawal'
//------------------------发送短信 END-------------------------//


//------------------------个人中心 START-------------------------//
const FEEDBACK_QUESTION_TYPE_BUG = 'Bug' //问题反馈 问题类型bug
const FEEDBACK_QUESTION_TYPE_OPTIMIZATION = 'Optimization' //问题反馈 问题类型建议

const USER_SEX_MAN = 'Man' //性别 男
const USER_SEX_WOMAN = 'Women' //性别 女
const USER_SEX_UNKNOWN = 'Unknown' //性别 未设置
//------------------------个人中心 END-------------------------//

//-------------------商城 START-------------------//
const PAY_TYPE_BALANCE = 1 //余额支付
const PAY_TYPE_ALIPAY = 2 //支付宝支付
const PAY_TYPE_WECHAT = 3 //微信支付

const ORDER_STATUS_PENDING = '0' //待支付
const ORDER_STATUS_SHIPPED = '1' //待发货
const ORDER_STATUS_RECEIPT = '2' //待收货
const ORDER_STATUS_COMPLETED = '3' //已完成
// const ORDER_STATUS_COMMENT = '4' //待评论
const ORDER_STATUS_CANCEL = '4' //交易关闭

const REFUND_LOGISTICS_STATUS_RECEIVED = 1 //申请退款，物流状态，已收货
const REFUND_LOGISTICS_STATUS_RECEIPT = 2 //申请退款，物流状态，未收货

const GOODS_SERVICE_RETURNS = '1' //无忧退货
const GOODS_SERVICE_FAST_REFUND = '2' //快速退款
const GOODS_SERVICE_FREE_SHIPPING = '3' //免费包邮

const ADDRESS_STATUS_DEF = 1 //默认收货地址
//-------------------商城 END-------------------//

module.exports = {

	//-----------------------协议 START--------------------//
	PROTOCOL_TYPE_PRIVACY,
	//-----------------------协议 END--------------------//


	//-----------------------短信 START--------------------//
	SMS_TYPE_LOGIN,
	SMS_TYPE_REGISTER,
	SMS_TYPE_BIND_BANK,
	SMS_TYPE_UNBIND_BANK,
	SMS_TYPE_WITHDRAW,
	//-----------------------短信 END--------------------//


	//------------------------个人中心 START-------------------------//
	FEEDBACK_QUESTION_TYPE_BUG,
	FEEDBACK_QUESTION_TYPE_OPTIMIZATION,
	USER_SEX_MAN,
	USER_SEX_WOMAN,
	USER_SEX_UNKNOWN,
	//------------------------个人中心 END-------------------------//


	//-------------------商城 START-------------------//
	PAY_TYPE_BALANCE,
	PAY_TYPE_ALIPAY,
	PAY_TYPE_WECHAT,

	ORDER_STATUS_PENDING,
	ORDER_STATUS_SHIPPED,
	ORDER_STATUS_RECEIPT,
	// ORDER_STATUS_COMMENT,
	ORDER_STATUS_CANCEL,
	ORDER_STATUS_COMPLETED,

	REFUND_LOGISTICS_STATUS_RECEIVED,
	REFUND_LOGISTICS_STATUS_RECEIPT,

	GOODS_SERVICE_RETURNS,
	GOODS_SERVICE_FAST_REFUND,
	GOODS_SERVICE_FREE_SHIPPING,

	ADDRESS_STATUS_DEF
	//-------------------商城 END-------------------//
}
