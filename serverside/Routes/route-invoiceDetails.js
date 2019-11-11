const InvoiceDetails = require('../models/invoiceDetails');


module.exports = (server) => {

    server.post('/addNewInvoiceDetails', (req, res) => {
        const invoiceDetails = req.body;
        InvoiceDetails.bulkCreate(invoiceDetails)
            .then((res) => res.json({ success: true, message: 'Invoice-details Created' }))
            .catch(err => res.json({ success: false, err: err }));
    });

    server.get('/getSpecificInvoiceDetails/:slagme', (req, res) => {
        const invoice_id = req.params.slagme;
        // if (!invoice_id) {
        //     console.log("no Data crosspond to this id  ");
        // } else {
        //     console.log("invoice items data is ", invoice_id);
        // }
        InvoiceDetails.findAll({
            where: {
                invoice_id: invoice_id
            }
        })
            .then(details => res.json({ success: true, data: details }))
            .catch(err => res.json({ success: false, err: err }));
    });

    server.delete('/deleteInvoiceDetails/:slagme', (req, res) => {
        InvoiceDetails.destroy(
            {
                where: {
                    invoice_id: req.params.slagme
                }
            }).then((details) =>
                res.json({ success: true, data: details, message: 'Invoice Data has been deleted successfully' }

                ))
            .catch(err => res.json({ success: false, err: err }));
    });
}