export default async function E1m1 (sleep, ActivateFret) {
  const speed = 125
  const stdn = "12n"
  const DoubleE = async () => {
    await ActivateFret(5, 0, speed, '12n')
    await ActivateFret(5, 0, speed, '12n')
  }

  const DoubleA = async () => {
    await ActivateFret(4, 0, speed, '12n')
    await ActivateFret(4, 0, speed, '12n')
  }

  const Descent = async hold => {
    await DoubleE()
    await ActivateFret(4, 7, speed, '12n')
    await DoubleE()
    await ActivateFret(4, 5, speed, '12n')
    await DoubleE()
    await ActivateFret(4, 3, speed, '12n')
    await DoubleE()
    await ActivateFret(4, 1, hold ? speed * 3 : speed, hold ? '8n' : '12n')
  }

  const SecondDescent = async hold => {
    await DoubleA()
    await ActivateFret(3, 7, speed, '12n')
    await DoubleA()
    await ActivateFret(3, 5, speed, '12n')
    await DoubleA()
    await ActivateFret(3, 3, speed, '12n')
    await DoubleA()
    await ActivateFret(3, 1, hold ? speed * 3 : speed, hold ? '8n' : '12n')
  }

  const ThirdDescent = async () => {
      const d44 = async () => {
        await ActivateFret(4,4,speed,stdn)
        await ActivateFret(4,4,speed,stdn)
      }

      const d22 = async () => {
        await ActivateFret(4,2,speed,stdn)
        await ActivateFret(4,2,speed,stdn)
      }

      await d44()
      await ActivateFret(2,6,speed,stdn)
      await d44()
      await ActivateFret(2,4,speed,stdn)
      await d44()
      await ActivateFret(3,7,speed,stdn)
      await d44()
      await ActivateFret(3,5,speed,stdn)
      await d44()
      await ActivateFret(3,6,speed,stdn)
      await ActivateFret(3,7,speed,stdn)
      await d22()
      await ActivateFret(2,4,speed,stdn)
      await d22()
      await ActivateFret(2,2,speed,stdn)
      await d22()
      await ActivateFret(3,5,speed,stdn)
      await ActivateFret(4,0,speed,stdn)
      await ActivateFret(4,0,speed,stdn)
      await ActivateFret(3,3,speed*3,"8n")
      
  }

  //   const Solo = async () => {
  //     const s = 1.5
  //     await ActivateFret(0, 2, speed / s, '24n')
  //     await ActivateFret(0, 0, speed / s, '24n')
  //     await ActivateFret(1, 4, speed / s, '24n')
  //     await ActivateFret(0, 2, speed / s, '24n')
  //     await ActivateFret(0, 5, speed / s, '24n')
  //     await ActivateFret(0, 3, speed / s, '24n')
  //     await ActivateFret(0, 2, speed / s, '24n')
  //     await ActivateFret(1, 4, speed / s, '24n')
  //     await ActivateFret(0, 2, speed / s, '24n')
  //     await ActivateFret(0, 3, speed / s, '24n')
  //     await ActivateFret(0, 5, speed / s, '24n')
  //     await ActivateFret(0, 7, speed / s, '24n')
  //     await ActivateFret(0, 5, speed / s, '24n')
  //     await ActivateFret(0, 3, speed / s, '24n')
  //     await ActivateFret(0, 2, speed / s, '24n')
  //     await ActivateFret(1, 4, speed / s, '24n')
  //   }

  for (let i = 0; i < 2; i++) {
    await Descent(false)
    await DoubleE()
    await ActivateFret(4, 2, speed, '12n')
    await ActivateFret(4, 3, speed, '12n')
    await Descent(true)
    await sleep(speed * 2)
  }

  await SecondDescent(false)
  await DoubleA()
  await ActivateFret(3, 2, speed, '12n')
  await ActivateFret(3, 3, speed, '12n')
  await SecondDescent(true)
  await sleep(speed * 2)

  await Descent(false)
  await DoubleE()
  await ActivateFret(4, 2, speed, '12n')
  await ActivateFret(4, 3, speed, '12n')
  await Descent(true)
  await sleep(speed * 2)

  await ThirdDescent()

  await Descent(false)
  await DoubleE()
  await ActivateFret(4, 2, speed, '12n')
  await ActivateFret(4, 3, speed, '12n')
  await Descent(true)
  await sleep(speed * 2)

  //   await Solo()
}
