import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap'
import { BiAlarmAdd } from "react-icons/bi";

function App() {
  // Leer datos guardados de localStorage o empezar vacío
  const [datos, setDatos] = useState(() => {
    const guardado = localStorage.getItem('horasPredicadas')
    return guardado ? JSON.parse(guardado) : {}
  })

  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date())
  const [mostrarModal, setMostrarModal] = useState(false)
  const [horas, setHoras] = useState('')

  const key = format(fechaSeleccionada, 'yyyy-MM-dd')
  const fechaFormateada = format(fechaSeleccionada, 'dd/MM/yyyy', { locale: es })
  const horasDelDia = datos[key] || ''

  const manejarClick = (date) => {
  const hoy = new Date()
  hoy.setHours(0,0,0,0)
  date.setHours(0,0,0,0)
  
  
  setFechaSeleccionada(date)
}

  const abrirModal = () => {
  const hoy = new Date()
  hoy.setHours(0,0,0,0)
  const fechaSel = new Date(fechaSeleccionada)
  fechaSel.setHours(0,0,0,0)

  if (fechaSel > hoy) {
    alert('No podés agregar horas a días futuros')
    return
  }

  setHoras(datos[key] || '')
  setMostrarModal(true)
}

  const guardarHoras = () => {
    const nuevoDatos = { ...datos, [key]: horas }
    setDatos(nuevoDatos)
    localStorage.setItem('horasPredicadas', JSON.stringify(nuevoDatos)) // Guardar en localStorage
    setMostrarModal(false)
  }

  // Si querés actualizar datos en tiempo real (opcional)
  // useEffect(() => {
  //   localStorage.setItem('horasPredicadas', JSON.stringify(datos))
  // }, [datos])

  return (
    <Container className="py-4" style={{margin:'0 0 0 0', backgroundColor: '#f8f9fa'}}>
      <header style={{backgroundColor: '#f8f9fa'}}>
        <h1 className="mb-4"
          style={{
            textAlign: 'center',
            color: '#D4AF37',
            fontStyle: 'italic',
            margin: '8px 0px 8px 0px',
            width: '100%',
          }}>
          Campaña de predicación
        </h1>

        <h3 style={{
          textAlign: 'center',
          color: '#6c757d',
          fontStyle: 'italic',
          fontSize: '16px',
          marginBottom:'16px',
        }}>
          Estas buenas nuevas del <span style={{color: '#17a2b8'}}>Reino </span> se predicarán en toda la tierra habitada {<span style={{color: '#17a2b8'}}>(Mateo 24:14)</span>}
        </h3>
      </header>
      <Row>
        <Col md={6}>
          <Card className="p-3">
            <Calendar onClickDay={manejarClick} value={fechaSeleccionada} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h4
              style={{
                display: 'flex',
                gap: '2%',
                textAlign: 'center',
                color: '#D4AF37',
                fontStyle: 'italic',
                margin: '8px 0px 8px 0px',
                width: '100%'
              }}>
                Día seleccionado:  {<span style={{color: '#6c757d'}}>{fechaFormateada}</span>}
            </h4>

            <p
              style={{
                display: 'flex',
                gap: '2%',
                color: '#6c757d',
                fontStyle: 'italic',
                fontSize: '16px',
              }}>

              {horasDelDia ? <strong>Horas Registradas: {horasDelDia} Horas</strong> : <span style={{
                color: '#6c757d',
                fontStyle: 'italic',
                fontSize: '16px',
              }}>
                ¿Y cómo pondrán su fe en él si no han oído hablar de él? ¿Y cómo oirán sin alguien que predique? {<span style={{color: '#17a2b8'}}>(Romanos 10:14)</span>}
              </span>}
            </p>
          </Card>
          <BiAlarmAdd
            style={{
              fontSize: '32px',
              margin: '16 0 0 0',
              color:'#6c757d',
              cursor: 'pointer',
            }}
            onClick={abrirModal}
          />
        </Col>
      </Row>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Horas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Horas predicadas el {fechaFormateada}</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={horas}
                onChange={e => setHoras(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={guardarHoras}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default App
