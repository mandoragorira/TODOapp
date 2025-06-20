// src/components/Modal.tsx

import React from 'react';

// Modalコンポーネントが受け取る情報（props）の種類を決めるよ
interface ModalProps {
  isOpen: boolean; // ポップアップを開くか閉じるか
  onClose: () => void; // ポップアップを閉じる時に呼び出す関数
  children: React.ReactNode; // ポップアップの中に表示する内容（テキストでも別の部品でもOK）
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // isOpenがfalse（開いてない）なら、何も表示しないよ
  if (!isOpen) return null;

  return (
    // ポップアップの背景（画面全体を覆って、後ろを暗くする部分）
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      {/* ポップアップの本体（白い四角の部分） */}
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 relative">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          aria-label="閉じる"
        >
          &times; {/* これは「×」のマークだよ */}
        </button>

        {/* ここに、親から渡された中身（children）が表示されるよ */}
        {children}
      </div>
    </div>
  );
};

export default Modal;