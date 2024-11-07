
export default function DetailPagePhotos({spotImages = []}) {
  return (   
    <div className="div-pictures">
      {spotImages.map((data) => {
        if (data.preview) {
          const byteArray = new Uint8Array(data.file.data);
          const binaryString = Array.from(byteArray)
              .map(byte => String.fromCharCode(byte))
              .join('');
          return <img className="mainImage"src={`data:image/jpeg;base64,${btoa(binaryString)}`}/> // Ensure you use the correct MIME type 
        }
      })}
      <div className="div-sideImages">
      {spotImages.map((data) => {
        if (spotImages.indexOf(data) > 3) {
          return 
        } else if (!data.preview){
          const byteArray = new Uint8Array(data.file.data);
          const binaryString = Array.from(byteArray)
            .map(byte => String.fromCharCode(byte))
            .join('');
          return <img className="sideImage"src={`data:image/jpeg;base64,${btoa(binaryString)}`}/> // Ensure you use the correct MIME type
        }
      })}
      </div>
    </div>
  )
}