'use client';

import { useEffect, useState } from 'react';
import ResultsSection from '../components/ResultsSection';

export default function ResultsPage() {
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeTips, setResumeTips] = useState('');
  const [linkedinMessage, setLinkedinMessage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('ai-result');
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      const result = parsed.result || parsed;

      setCoverLetter(result.coverLetter || '');
      setResumeTips(result.resumeTips || '');
      setLinkedinMessage(result.linkedinMessage || '');
    } catch (err) {
      console.error('Failed to parse stored AI result', err);
    }
  }, []);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ResultsSection
        coverLetter={coverLetter}
        resumeTips={resumeTips}
        linkedinMessage={linkedinMessage}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
}
