const { Document, Paragraph, Packer } = require('docx');
async function createAndExportWordFile() {
    // Dữ liệu hóa đơn của bạn
    const invoiceData = {
        customer: 'Tên khách hàng',
        totalAmount: '$100',
        // Thêm các thông tin khác của hóa đơn...
    };

    // Tạo một tài liệu Word mới
    const doc = new Document();
    doc.addSection({
        properties: {},
        children: [
            new Paragraph(`Hóa đơn cho: ${invoiceData.customer}`),
            new Paragraph(`Tổng cộng: ${invoiceData.totalAmount}`),
            // Thêm các phần khác của hóa đơn vào đây...
        ],
    });

    try {
        const buffer = await Packer.toBuffer(doc);
        fs.writeFileSync('invoice.docx', buffer);
        console.log('File Word đã được tạo thành công.');
    } catch (error) {
        console.error('Lỗi khi tạo file Word:', error);
    }
}
