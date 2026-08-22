import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowRight, CloseCircle } from "iconsax-react";
import { formatSize } from "~/utils/formatSize";
import "./FormUpload.scss";

interface FormUploadProps {
  onSubmit: (data: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => void;
  isProcessing: boolean;
  statusText: string;
}

const FormUpload = ({
  onSubmit,
  isProcessing,
  statusText,
}: FormUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const maxFileSize = 20 * 1024 * 1024;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0] || null;
    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: maxFileSize,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData(e.currentTarget);

    const companyName =
      formData.get("company-name")?.toString().trim() || "";

    const jobTitle =
      formData.get("job-title")?.toString().trim() || "";

    const jobDescription =
      formData.get("job-description")?.toString().trim() || "";

    onSubmit({
      companyName,
      jobTitle,
      jobDescription,
      file,
    });
  };

  return (
    <div className="form-upload">
      {/* =========================================
          HEADING
      ========================================= */}

      <div className="form-upload__heading">
        {/* <span className="form-upload__eyebrow">
          RESUME ANALYSIS
        </span> */}

        <h1>
          Smart feedback for{" "}
     
          <span>your dream job.</span>
        </h1>

        <p>
          Drop your resume for an ATS score and
          improvement tips.
        </p>
      </div>

      {/* =========================================
          PROCESSING
      ========================================= */}

      {isProcessing ? (
        <div className="form-upload__processing">
          <h2>{statusText}</h2>

          <img
            src="/images/resume-scan.gif"
            className="form-upload__processing-image"
            alt="Processing resume"
          />
        </div>
      ) : (
        <form
          className="form-upload__form"
          onSubmit={handleSubmit}
        >
          {/* =========================================
              COMPANY
          ========================================= */}

          <div className="form-upload__field">
            <label htmlFor="company-name">
              Company Name
            </label>

            <input
              type="text"
              name="company-name"
              id="company-name"
              placeholder="Enter company name"
              required
            />
          </div>

          {/* =========================================
              JOB TITLE
          ========================================= */}

          <div className="form-upload__field">
            <label htmlFor="job-title">
              Job Title
            </label>

            <input
              type="text"
              name="job-title"
              id="job-title"
              placeholder="Enter job title"
              required
            />
          </div>

          {/* =========================================
              JOB DESCRIPTION
          ========================================= */}

          <div className="form-upload__field">
            <label htmlFor="job-description">
              Job Description
            </label>

            <textarea
              name="job-description"
              id="job-description"
              rows={5}
              placeholder="Paste job description here"
              required
            />
          </div>

          {/* =========================================
              FILE UPLOAD
          ========================================= */}

          <div className="form-upload__field">
            <label>Upload Resume</label>

            <div className="form-upload__dropzone-wrapper">
              <div
                {...getRootProps()}
                className={`form-upload__dropzone ${
                  isDragActive
                    ? "form-upload__dropzone--active"
                    : ""
                } ${file ? "form-upload__dropzone--selected" : ""}`}
              >
                <input {...getInputProps()} />

                {file ? (
                  <div
                    className="form-upload__selected-file"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="form-upload__file-info">
                      <img
                        src="/images/pdf.png"
                        alt="PDF"
                      />

                      <div>
                        <p>{file.name}</p>

                        <span>
                          {formatSize(file.size)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      aria-label="Remove file"
                    >
                      <CloseCircle
                        size={22}
                        variant="Linear"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="form-upload__empty">
                    <div className="form-upload__upload-icon">
                      ↑
                    </div>

                    <p>
                      <strong>Click to Upload</strong>{" "}
                      or drag and drop
                    </p>

                    <span>
                      PDF (max {formatSize(maxFileSize)})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =========================================
              SUBMIT
          ========================================= */}

          <button
            type="submit"
            className="form-upload__submit"
            disabled={!file}
          >
            <span>Analyze Resume</span>

            <ArrowRight
              size={18}
              color="currentColor"
              variant="Linear"
            />
          </button>
        </form>
      )}
    </div>
  );
};

export default FormUpload;