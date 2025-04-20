<div>
  <div style={{ gap: '24px', marginTop: '25px' }}>
    <div>
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '4px',
        }}
      >
        <b>(role name)</b>
      </h1>

      <p style={{ color: '#444', marginBottom: '4px', fontSize: '15px' }}>
        <b>Age Range: </b>(agerange)
      </p>
      <p style={{ color: '#444', marginBottom: '4px', fontSize: '15px' }}>
        <b>Gender: </b>(gender)
      </p>
    </div>
  </div>

  <div style={{ marginTop: '24px' }}>
    <h1
      style={{
        fontSize: '22px',
        fontWeight: '750',
        marginBottom: '4px', // reduce spacing
      }}
    >
      (workingtitle)
    </h1>
    <p style={{ fontSize: '14px', color: '#333', marginTop: '0' }}>
      Working Title
    </p>
  </div>

  <div style={{ marginTop: '40px' }}>
    <h1
      style={{
        fontSize: '22px',
        fontWeight: '750',
        marginBottom: '4px', // reduce spacing
      }}
    >
      (studioname)
    </h1>
    <p style={{ fontSize: '14px', color: '#333', marginTop: '0' }}>Studio</p>
  </div>

  <div style={{ marginTop: '40px' }}>
    <h1
      style={{
        fontSize: '20px',
        fontWeight: '500',
        marginBottom: '4px', // reduce spacing
      }}
    >
      Description
    </h1>
    <p style={{ fontSize: '14px', color: '#333', marginTop: '0' }}>
      (description)
    </p>
  </div>

  <div style={{ marginTop: '40px' }}>
    <h2
      style={{
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '12px',
      }}
    >
      Genres
    </h2>

    {/* Center aligned text */}
    <p style={{ fontSize: '14px', color: '#333', textAlign: 'center' }}>
      {resumeData.genres.join(', ')}{' '}
      {/* You can edit this accordingly but I'll leave it for now */}
    </p>
  </div>
</div>;
