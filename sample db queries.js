db.assignments.insertOne({
  documentId: ObjectId('68cd4b5f89561b7f22eec4a9'), // Replace with actual document _id from insertOne response
  signerId: ObjectId('68ccfcd2b78ae946a47042f9'), // Sample signerId, replace with actual
  createdAt: ISODate('2025-09-19T16:23:00.000Z'),
  updatedAt: ISODate('2025-09-19T16:23:00.000Z'),
  __v: 0
})


db.Assignments.insertOne({
  documentId: ObjectId("6520c75e124b5a0e3c123456"),  // replace with a real Document ID
  signerId: ObjectId("6520c7e8124b5a0e3c654321"),    // replace with a real User ID
  signedAt: null,
  createdAt: new Date()
});


db.documents.insertOne({
  uploaderId: ObjectId("68cdd8d6e4e2c2e5463db102"),  // optional
  originalUrl: "https://example.com/original-doc.pdf",
  signedUrl: "https://example.com/signed-doc.pdf",
  status: "PENDING",
  signatureFields: [
    {
      type: "signature",
      x: 150,
      y: 200,
      page: 1
    },
    
  ],
  createdAt: new Date(),
  updatedAt: new Date() // optional but good to include when timestamps are enabled
});


db.users.insertOne({
  name: "taha 01",
  email: "taha01@example.com",
  password: "securepassword123", // Ideally hashed in real use
  role: "SIGNER",
  createdAt: new Date(),
  updatedAt: new Date()
});


{
    "assignments": [
        {
            "_id": "68cdda8be4e2c2e5463db129",
            "documentId": {
                "_id": "68cdda3b6862fff2ebeec4ac",
                "uploaderId": "68cdd8d6e4e2c2e5463db102",
                "originalUrl": "https://example.com/original-doc.pdf",
                "status": "PENDING",
                "signatureFields": [
                    {
                        "_id": "68cdddb2e4e2c2e5463db1d5",
                        "type": "signature",
                        "x": 150,
                        "y": 200,
                        "page": 1
                    }
                ],
                "createdAt": "2025-09-19T22:33:31.325Z"
            },
            "signerId": "68cdd8c4e4e2c2e5463db0fe",
            "createdAt": "2025-09-19T22:34:51.706Z",
            "updatedAt": "2025-09-19T22:34:51.706Z",
            "__v": 0
        }
    ]
}