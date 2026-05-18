# Harsh Singh — GSoC 2026 @ SciML

🔗 **Live Portfolio & Devlog:** [singhharsh1708.github.io/gsoc_blog](https://singhharsh1708.github.io/gsoc_blog/)

## Google Summer of Code 2026

**Project:** Native Julia ODE, SDE, DAE, DDE, and PDE Solvers  
**Organization:** SciML (NumFOCUS)  
**Mentors:** Chris Rackauckas, Kanav Gupta, Utkarsh, Oscar Smith  

### Overview

`OrdinaryDiffEq.jl` is one of the most comprehensive ODE solver libraries available, but its growth led to substantial code duplication. Most solver families (such as KenCarp, Kvaerno, and Verner) had their own bespoke `perform_step!` implementations. 

This project solves that architectural bottleneck by introducing a generic `IMEXTableau{Texplicit, Timplicit}` struct and expanding the generic tableau refactor across all 16 Runge-Kutta solver families. This transition removes roughly ~3,300 lines of duplicated code, guarantees zero-allocation performance, and provides a streamlined interface for introducing novel methods in the future. 

### Key Deliverables

- **IMEX Tableau Migration:** Replacing bespoke steppers for the ARS, ESDIRK, KenCarp, and Kvaerno families with a single, highly-optimized generic dispatch.
- **Multirate Solvers:** Implementing full, generic solvers for systems where components evolve at vastly different timescales (MREIL, MIS, MRGARK).
- **RK Family Generalization:** Extending the generic stepper framework to encompass LowStorageRK, Verner, and HighOrderRK architectures.

All changes strictly preserve mathematical invariants, bounds checking, and high-performance zero-allocation guarantees required for SciML workloads.
