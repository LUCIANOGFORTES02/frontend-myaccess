import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mediaService } from '@/api/mediaService';
import React from 'react'

interface FileDetailsData {
    id: string;
    thumbnail: string; // URL da miniatura
    type: string;
    title: string;
    description: string;
    tags: string;
  }

export default function View() {
    const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
    const navigate = useNavigate();
    const [fileData, setFileData] = useState<FileDetailsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      fetchFileDetails();
    }, [id]);
  
    const fetchFileDetails = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const data = await mediaService.fetchMediaById(id!); // Busca os dados pelo ID
        setFileData(data);
      } catch (error) {
        setError('Erro ao carregar os detalhes do arquivo.');
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    if (!fileData) return <p>Arquivo não encontrado.</p>;
  
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          Voltar
        </Button>
  
        <div className="flex shadow-lg rounded-lg overflow-hidden border border-gray-700">
          {/* Miniatura */}
          <div className="flex-shrink-0">
            <img
              src={fileData.thumbnail}
              alt={fileData.title}
              className="h-64 w-64 object-cover"
            />
          </div>
          <div className="flex flex-col flex-grow p-4">
            <h1 className="text-2xl font-bold mb-2">{fileData.title}</h1>
            <p className="text-sm text-gray-600">{fileData.description}</p>
            <p className="text-sm text-gray-500 mt-2">Tags: {fileData.tags}</p>
            <p className="text-sm text-gray-500 mt-2">Tipo: {fileData.type}</p>
          </div>
        </div>
  
        {/* Exibir conteúdo adicional, se aplicável */}
        {fileData.type === 'video' && (
          <video
            controls
            className="mt-4 w-full max-h-96 rounded-md"
            src={fileData.thumbnail}
          />
        )}
        {fileData.type === 'audio' && (
          <audio controls className="mt-4 w-full">
            <source src={fileData.thumbnail} type="audio/mpeg" />
            Seu navegador não suporta o elemento de áudio.
          </audio>
        )}
      </div>
    );
  }