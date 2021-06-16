//const publishable_key = "pk_test_51J2LzZCRp5jovKXl1uOmJejbmk5OODH809wGw6mGWUpz6Jyxn5HQhBn3x2MfQj54uduphz4LbqrGFwpj8KI5tVJh00ayk7R2X6"
//const secret_key = "sk_test_51J2LzZCRp5jovKXly3xRcKy5GZkUIZ0AjsuxeFE8GsPPh9OcbXa0SMvjZzDcQyMBQIRCLgQrTw8c754PNTQjJJKV00urxQWA4w"
//const stripe = require('stripe')(publishable_key)
//https://js.stripe.com/v3

const Stripe_Key = process.env.Stripe_Key
const stripe = require("stripe")(Stripe_Key);
const customerId = 'cus_Jg8iI59XsW5nhS'

// exports.getStripe = (req, res, next) =>{
//     res.send(" Stripe Hello World!");
// }

exports.createNewCustomer = async (req, res, next) =>{
    try{
        const customer = await stripe.customers.create({
            email: req.body.email
        })
        //console.log(customer)
        return res.status(200).json({
            customerId: customer.id,
            customerEmail: customer.email
        })
    }catch(err) {
        //console.log(err)
        return res.status(400).json({
            Error: err.raw.message
        })
    }
}

exports.createCustomerCard = async (req, res, next) =>{
    const {
        cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCVC,
        cardName,
        country,
        postal_code,
    } = req.body
    if(!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC){
        return res.status(400).json({
            Error: "Please provide all necessary details to add your card"
        })
    }
    try{
        const cardToken = await stripe.tokens.create({
            card: {
                name: cardName,
                number: cardNumber,
                exp_month: cardExpMonth,
                exp_year: cardExpYear,
                cvc: cardCVC,
                address_country: country,
                address_zip: postal_code
            }
        })
        //console.log(cardToken)
        //console.log(cardToken.id)
        //customerid
        const card = await stripe.customers.createSource(customerId, {
            source: `${cardToken.id}`
        })
        return res.status(200).json({
            card: card.id
        })
    }catch (err) {
        //console.log(err);
        return res.status(400).json({
            Error: err
        })
    }
}

exports.getAllCards = async (req, res, next) =>{
    let cards = []
    try{
        //customerid
        const savedCards = await stripe.customers.listSources(customerId, {
            object: 'card'
        })
        const cardDetails = Object.values(savedCards.data)
        cardDetails.forEach((cardData) =>{
            let obj = {
                cardId: cardData.id,
                cardType: cardData.brand,
                cardExpDetails: `${cardData.exp_month}/${cardData.exp_year}`,
                cardLast4: cardData.last4
            }
            cards.push(obj)
        })
        return res.status(200).json({
            cardDetails: cards
        })
    }catch (err) {
        return res.status(400).json({
            Error: err.raw.message
        })
    }
}

exports.updateCard = async (req, res, next) =>{
    const {cardName, cardExpMonth, cardExpYear, cardId} = req.body
    if(!cardId){
        return res.status(400).json({
            Error: 'cardId is required to update card'
        })
    }
    try{
        //customer id and card id
        const card = await stripe.customers.updateSource(customerId, cardId, {
            name: cardName,
            exp_month: cardExpMonth,
            exp_year: cardExpYear
        })
        return res.status(200).json({
            updatedCard: card
        })
    }catch(err){
        return res.status(400).json({
            Error: err.raw
        })
    }
}

exports.deleteCard = async (req, res, next) =>{
    const {cardId} = req.body
    if(!cardId){
        return res.status(400).json({
            Error: 'cardId is required to delete card'
        })
    }
    try{
        const deletedCard = await stripe.customers.deleteSource(customerId, cardId)
        return res.status(400).json(deletedCard)
    }catch (err) {
        return res.status(400).json({
            Error: err.raw.message
        })
    }
}

exports.makePayment = async (req, res, next) =>{
    const {amount, cardId, oneTime, email} = req.body
    if(oneTime){
        const {
            cardNumber,
            cardExpMonth,
            cardExpYear,
            cardCVC,
            country,
            postal_code,
        } = req.body
        if(!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC){
            return res.status(400).json({
                Error: "Necessary card details are required for one time payment"
            })
        }
        try{
            const cardToken = await stripe.tokens.create({
                card: {
                    number: cardNumber,
                    exp_month: cardExpMonth,
                    exp_year: cardExpYear,
                    cvc: cardCVC,
                    address_country: country,
                    address_zip: postal_code
                }
            })
            const charge = await stripe.charges.create({
                amount: amount,
                currency: 'usd',
                source: cardToken.id,
                receipt_email: email,
                description: `Stripe charge an amount of ${amount} for one time payment`
            })
            //console.log(charge.status)
            if(charge.status === 'succeeded'){
                return res.status(200).json({Success: charge})
            }else{
                return res.status(400).json({
                    Error: "Please try again later for one time payment"
                })
            }
        }catch(err){
            return res.status(400).json({
                Error: err.raw.message
            })
        }
    } else{
        try{
            const createCharge = await stripe.charges.create({
                amount: amount,
                currency: 'usd',
                receipt_email: email,
                card: cardId,
                customer: customerId,
                description: `Stripe charge an amount of ${amount} for payment`
            })
            //console.log(createCharge.card);
            //console.log(createCharge.status)
            if(createCharge.status === 'succeeded'){
                return res.status(200).json({Success: createCharge})
            }else{
                return res.status(400).json({
                    Error: "Please try again later for payment"
                })
            }
        }catch(err){
            //console.log(err);
            return res.status(400).json({
                Error: err.raw.message
            })
        }
    }
}