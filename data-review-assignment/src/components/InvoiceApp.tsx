import { useEffect, useState } from "react";


export default function InvoiceApp() {
  // Loading State: Indicates if the data is being fetched
  const [status, setStatus] = useState('');
  const [editable, isEditable] = useState(true);

  const [invoices, setInvoices] = useState('');
  // Error State: Stores any errors that occur during data fetching.
  const [, setError] = useState<unknown>(null);
  // Row Data: The data to be displayed.
  const [formData, setFormData] = useState({
    recipientName: 'Dillon',
    recipientAddress: '123 Main St, Springfield, IL',
    description: 'This is for a bag',
    message: 'Bag',
    total: 400,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? Number(value) : value
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    const { recipientName, recipientAddress, description, message, total } = formData;

    const payload = {
      recipientName,
      recipientAddress,
      description,
      lineItems: [message],
      total,
      editable,}

    e.preventDefault();

    setStatus('Submitting...');
    console.log(payload);

    const res = await fetch('/api/invoice-creation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('Job added to the queue!');
    } else {
      setStatus(`Error: ${data.error}`);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h1 style={{fontSize: 'x-large'}}>Create Invoice</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Recipient Name</label><br />
          <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} required />
        </div>

        <div>
          <label>Recipient Address</label><br />
          <input type="string" name="recipientAddress" value={formData.recipientAddress} onChange={handleChange} required />
        </div>

        <div>
          <label>Invoice Description</label><br />
          <input type="string" name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div>
          <label>Line Items</label><br />
          <textarea name="message" value={formData.message} onChange={handleChange} rows={4} />
        </div>
        <div>
          <label>Invoice Total</label><br />
          <input type="number" name="total" value={formData.total} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}