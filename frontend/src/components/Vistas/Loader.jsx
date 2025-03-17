import React from "react";

export default function Loader({ message = "Procesando..." }) {
  return (
    <div className="fixed inset-0 bg-gray/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="loadingio-spinner-gear-nq4q5u6dq7r mb-4">
          <div className="ldio-x2uulkbinbj">
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <p className="text-gray-800 font-medium text-center">{message}</p>
      </div>
    </div>
  );
}
