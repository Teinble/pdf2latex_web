interface FileUploadInputProps {
    setFile: (file: File) => void;
}
export const FileUploadInput = ({setFile}: FileUploadInputProps) => {
    return( 
    <div className="card">
        <label className="card-title">
            Upload Your Latex Image Here:
        </label>

        <input className="file-input" type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
                setFile(file);
            }
        }} />
    </div>
    );
}