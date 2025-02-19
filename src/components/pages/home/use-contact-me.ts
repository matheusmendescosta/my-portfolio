'use client';

import { useState } from 'react';

const useContactMe = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      const response = await fetch('/api/contactme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('E-mail enviado com sucesso!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Erro ao enviar o e-mail.');
      }
    } catch (error) {
      setStatus('Erro ao conectar com o servidor.');
    }
  };
  return {
    handleSubmit,
    handleChange,
    formData,
    status,
  };
};

export default useContactMe;
