const Ammo = require('.');

const TRANSFORM_AUX = new Ammo.btTransform();

const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
const dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
const broadphase = new Ammo.btDbvtBroadphase();
const solver = new Ammo.btSequentialImpulseConstraintSolver();
const physicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration );
physicsWorld.setGravity( new Ammo.btVector3( 0, -10, 0 ) );

const boxShape = new Ammo.btBoxShape(new Ammo.btVector3( 0.5, 0.5, 0.5 ));
const boxTransform = new Ammo.btTransform();
boxTransform.setIdentity();
boxTransform.setOrigin( new Ammo.btVector3( 0, 5, 0 ) );
const boxMass = 1;
const boxLocalInertia = new Ammo.btVector3( 0, 0, 0 );
const boxMotionState = new Ammo.btDefaultMotionState( boxTransform );
const boxBody = new Ammo.btRigidBody( new Ammo.btRigidBodyConstructionInfo( boxMass, boxMotionState, boxShape, boxLocalInertia ) );
physicsWorld.addRigidBody( boxBody );

const groundShape = new Ammo.btStaticPlaneShape(new Ammo.btVector3( 0, 1, 0 ), 0);
const groundTransform = new Ammo.btTransform();
groundTransform.setIdentity();
groundTransform.setOrigin( new Ammo.btVector3( 0, 0, 0 ) );
const groundMass = 0;
const groundLocalInertia = new Ammo.btVector3( 0, 0, 0 );
const groundMotionState = new Ammo.btDefaultMotionState( groundTransform );
const groundBody = new Ammo.btRigidBody( new Ammo.btRigidBodyConstructionInfo( groundMass, groundMotionState, groundShape, groundLocalInertia ) );
physicsWorld.addRigidBody( groundBody );

let lastTime = Date.now();
const interval = setInterval(() => {
  const now = Date.now();
  const dt = (now - lastTime) / 1000;
  physicsWorld.stepSimulation(dt, 2);

  const ms = boxBody.getMotionState();
  ms.getWorldTransform(TRANSFORM_AUX);
  const pv = TRANSFORM_AUX.getOrigin();
  const p = [pv.x(), pv.y(), pv.z()];
	const qv = TRANSFORM_AUX.getRotation();
  const q = [qv.x(), qv.y(), qv.z(), qv.w()];
  console.log(p, q);

  lastTime = now;
}, 1000 / 60);
