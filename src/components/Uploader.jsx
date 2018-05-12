
import React from 'react'
import Dropzone from 'react-dropzone'
import { upload } from '../uploader/coral'

/* global FileReader */

class Uploader extends React.Component {
  uploadToCoral(files) {
    const {
      gallery,
      finishUpload,
      startUpload,
      handleUploadError,
    } = this.props

    files.forEach((file) => {
      const reader = new FileReader()

      reader.addEventListener('load', async () => {
        const { result } = reader

        try {
          await upload(Buffer.from(result), gallery)
          finishUpload(gallery, file)
        } catch (err) {
          handleUploadError(err, gallery, file)
        }
      })

      startUpload(gallery, file)
      reader.readAsArrayBuffer(file)
    })
  }

  render() {
    const { description, uploads } = this.props

    return (
      <div className="panel bg-dark">
        <h4 className="text-center">Upload photos</h4>
        {description && (<p className="text-center text-large">{description}</p>)}
        <div className="uploads">
          {uploads.map(({
            fileName,
            preview,
            status,
            id,
          }) => (
            <div key={id} className={`upload-preview ${status.toLowerCase()}`}>
              <img src={preview} alt={fileName} width="146" />
              <br />
              {status}
            </div>
          ))}
        </div>
        <div className="dropzone">
          <Dropzone
            className="dropzone-container"
            onDrop={acceptedFiles => this.uploadToCoral(acceptedFiles)}
          >
            <p>Drag and drop photos here!</p>
          </Dropzone>
        </div>
        <div className="instructions">
          <p>
            Images must be smaller than 5 MB. If an upload failed, it is likely
            because the image was too large. Try resizing and uploading again.
          </p>
          <p>
            If you continue to have problems uploading, try emailing your
            pictures to&nbsp;
            <a href="mailto:pictures@stage5clingan.com">
              pictures@stage5clingan.com
            </a>.
          </p>
          <p>
            Photos may not be visible immediately on the site. If you upload
            something and do not see it right away, check back in a day or two.
          </p>
        </div>
      </div>
    )
  }
}

export default Uploader
